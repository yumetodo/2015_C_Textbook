#if defined(_MSC_VER) && _MSC_VER >= 1400
#define _CRT_RAND_S
#include <stdlib.h>//rand_s
#endif
#include "mtrand32.h"
#include "ia_rdrand.h"//rdrand_supported(), rdrand()
//#include "nth_loop.h"
#include <cstdint>//uint_least32_t
#include <vector>
#include <algorithm>//std::generate
#include <ctime>//clock(), time()
inline void mtrand32_init(std::vector<std::uint_least32_t>& sed_v, std::random_device& rnd) {
	std::generate(sed_v.begin(), sed_v.end(), std::ref(rnd));// ベクタの初期化
	if (IsRDRANDsupport()) {//RDRAND命令の結果もベクターに追加
		for (std::size_t i = 0; i < 2; i++) {
			unsigned int rdrand_value = 0;
			_rdrand32_step(&rdrand_value);
			if (0 != rdrand_value) {
				sed_v.push_back(rdrand_value);
			}
		}
	}
#if defined(_MSC_VER) && _MSC_VER >= 1400//VIsual Studio 2005より実装のrand_sの結果もベクターに追加
	unsigned int rand_s_value = 0;
	rand_s(&rand_s_value);
	if (0 != rand_s_value) {
		sed_v.push_back(rand_s_value);
	}
#endif
	sed_v.push_back(clock());//clock関数の結果もベクターに追加
	sed_v.push_back(static_cast<std::uint_least32_t>(time(nullptr)));//time関数の結果もベクターに追加
	char* heap = static_cast<char*>(malloc(sizeof(char) * 2));//ヒープ領域のアドレスもベクターに追加
	sed_v.push_back(reinterpret_cast<std::uint_least32_t>(heap));
	free(heap);
}
