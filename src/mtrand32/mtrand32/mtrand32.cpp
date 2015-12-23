#if defined(_WIN32) || defined(_WIN64)
#if (!defined(_MSC_VER) || _MSC_VER >= 1400) && (!defined(DISABE_CRT_RAND_S))//VIsual Studio 2005よりrand_sは実装された
#define _CRT_RAND_S
#endif //_MSC_VER >= 1400
#define MY_ARC_FOR_WINDWOS 1
#include <Windows.h>
#endif // defined(_WIN32) || defined(_WIN64)
#include <stdlib.h> //rand_s, malloc
#include "mtrand32.h"
#include "ia_rdrand.h"//rdrand_supported(), rdrand()
#include <algorithm>//std::generate
#include <ctime>//clock(), time()
#include <functional>//std::ref in gcc
#include <vector>
using seed_v_t = std::vector<std::uint_least32_t>;
seed_v_t mtrand32_create_seed() {
	std::random_device rnd;// ランダムデバイス
	seed_v_t sed_v(10);// 初期化用ベクター
	std::generate(sed_v.begin(), sed_v.end(), std::ref(rnd));// ベクタの初期化
	if (IsRDRANDsupport()) {//RDRAND命令の結果もベクターに追加
		for (std::size_t i = 0; i < 4; i++) {
			unsigned int rdrand_value = 0;
#ifndef __GNUC__
			_rdrand32_step(&rdrand_value);
#else
			__builtin_ia32_rdrand32_step(&rdrand_value);
#endif
			if (0 != rdrand_value) {
				sed_v.push_back(rdrand_value & i);
			}
		}
	}
#ifdef _CRT_RAND_S
	unsigned int rand_s_value = 0;
	rand_s(&rand_s_value);
	if (0 != rand_s_value) {
		sed_v.push_back(rand_s_value);
	}
#endif //_CRT_RAND_S
#ifdef MY_ARC_FOR_WINDWOS
	POINT point;
	GetCursorPos(&point);
	sed_v.push_back(point.x);
	sed_v.push_back(point.y);
#endif //MY_ARC_FOR_WINDWOS
	sed_v.push_back(static_cast<std::uint_least32_t>(clock()));//clock関数の結果もベクターに追加
	sed_v.push_back(static_cast<std::uint_least32_t>(time(nullptr)));//time関数の結果もベクターに追加
	char* heap = static_cast<char*>(malloc(sizeof(char) * 2));
	sed_v.push_back(static_cast<std::uint_least32_t>(reinterpret_cast<std::uint_least64_t>(heap)));//ヒープ領域のアドレスもベクターに追加
	free(heap);
	return sed_v;
}
std::mt19937 create_engine() {
	auto sed_v = mtrand32_create_seed();
	std::seed_seq seq(sed_v.begin(), sed_v.end());
	return std::mt19937(seq);
}
