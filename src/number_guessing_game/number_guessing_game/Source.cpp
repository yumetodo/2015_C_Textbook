#if defined(_WIN32) || defined(_WIN64)
#include <windows.h>
#include <mmsystem.h>
#if defined(_MSC_VER) || defined (__clang__)
#pragma comment(lib, "winmm.lib")
#endif
#undef max//std::numeric_limitsとのconflict防止
#endif
#include <iostream>
#include <exception>
#include <limits>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <ctime>
unsigned int libc_rand_32_normal(){
	unsigned int r = 0;
	r  = ((rand() >> 3) & 0x0fff); // 12 bit
	r |= ((rand() >> 4) & 0x07ff) << 12; // 12+11 : 23 bit
	r |= ((rand() >> 6) & 0x01ff) << 23; // 12+11+9 : 32 bit
	return r;
}
unsigned int create_seed(int argc, char* argv[], uint32_t num = 0) {
	char* dst = static_cast<char*>(malloc(sizeof(char) * 2));
	srand(static_cast<unsigned int>(time(nullptr) % std::numeric_limits<unsigned int>::max()));
#if defined(_WIN32) || defined(_WIN64)
	timeBeginPeriod(1);
#endif
	unsigned int seed = (
			(reinterpret_cast<uint64_t>(argv) >> 2)
			+ (reinterpret_cast<uint64_t>(&argc) >> (clock() % 16))
			^ (static_cast<uint64_t>(num + libc_rand_32_normal()) | clock() ^ time(nullptr))
			| (reinterpret_cast<uint64_t>(dst) >> (time(nullptr) % 5))
			^ (static_cast<uint64_t>((rand() & 0xff) << 16) | (3457450835 >> ((rand() >> 4) % 4)))
			+ ((rand() >> 4) & 0x07ff) + (libc_rand_32_normal() << (clock() % 7))
		) % std::numeric_limits<unsigned int>::max();
	free(dst);
#if defined(_WIN32) || defined(_WIN64)
	timeEndPeriod(1);
#endif
	return seed;
}
unsigned int distribution(unsigned int max, unsigned int min, unsigned int rand_max, auto (*random)() ->unsigned int) {
	return min + static_cast<unsigned int>(random() * (max - min + 1.0) / (1.0 + rand_max));
}
template<typename T_> using limit = std::numeric_limits<T_>;//create new type. C++11:alias declaration
template<typename T_> T_ input(const char* echo_str, const T_ max = limit<T_>::max(), const T_ min = limit<T_>::lowest()) noexcept {
	static_assert(std::is_arithmetic<T_>::value, "unexpected type T_");//T_が整数か浮動小数点型でないならばコンパイルエラーを出す
	T_ buf;
	try {
		if (nullptr == echo_str) throw std::invalid_argument("echo_str is unexpected input");//エラー対策
		if ('\0' != echo_str[0]) std::cout << echo_str << std::endl;//文字列が空じゃなければ出力
		std::cin >> buf;//入力を受ける
		if (max < buf || buf < min) throw std::out_of_range("input is iligal");//範囲チェック
	}
	catch (std::exception& er) {
		std::cerr << er.what() << std::endl;//エラーメッセージ表示
		return input("再入力してください。", max, min);//エラー時は再帰する方向で
	}
	return buf;
}
void print_help_of_num(unsigned int target, unsigned int current) {
	std::cout << ((target > current) ? "もっと大きいよ" : "もっと小さいよ") << std::endl;;
}
int main(int argc, char* argv[]) {
	constexpr unsigned int range_max = 80;
	constexpr unsigned int range_min = 5;
	constexpr size_t ask_lim = 10;
	srand(create_seed(argc, argv));
	const auto target_num = distribution(range_max, range_min, limit<unsigned int>::max(), libc_rand_32_normal);
	printf("最大値%d, 最小値%dの間で乱数が生成されました。数当てゲームの開始です！\n", range_max, range_min);

	unsigned int input_buf;
	for (size_t i = 0; i < ask_lim && target_num != (input_buf = input("値を入力してください", range_max, range_min)); i++) {
		print_help_of_num(target_num, input_buf);
	}
	if (target_num != input_buf) {
		printf("%s 正解は%dです\n", "残念でした", target_num);
	}
	else {
		puts("成功！");
	}
	return 0;
}