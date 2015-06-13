#ifndef INC_MTRAND32_H
#define INC_MTRAND32_H
#if (defined(_MSC_VER) && _MSC_VER > 1000) || (defined(__clang__) && (__clang_major__ > 3 || (__clang_major__ == 3 && __clang_minor__ > 2))) ||(defined(__ICC) && __ICC > 1000) ||defined (__GNUC__) && !defined(__ICC) && !defined(__clang__) && (__GNUC__ >= 4 || (__GNUC__ == 3 && __GNUC_MINOR__ >= 4))
#pragma once
#endif
#include<random>
#include <type_traits>
extern inline void mtrand32_init(std::vector<std::uint_least32_t>& sed_v, std::random_device& rnd);

template <bool Con, class Then, class Else>
struct IF;
template <class Then, class Else>
struct IF<true, Then, Else> {
	typedef Then type;
};
template <class Then, class Else>
struct IF<false, Then, Else> {
	typedef Else type;
};

template<typename rand_type>
using my_uniform_distribution = IF<
	std::is_integral<rand_type>::value_type, std::uniform_int_distribution<rand_type>, IF<
		std::is_floating_point<rand_type>::value_type, std::uniform_real_distribution<rand_type>, rand_type
	>
>::type;

template<typename rand_type> class mtrand32
{
public:
	mtrand32(rand_type min, rand_type max) {
		std::random_device rnd;// ランダムデバイス
		std::vector<std::uint_least32_t> v(10);// 初期化用ベクター
		mtrand32_init(v, rnd);
		std::seed_seq seq(v.begin(), v.end());
		this->engine = std::move(std::mt19937(seq));
		static_assert(std::is_same<rand_type, IF<std::is_integral<rand_type>::value_type, std::uniform_int_distribution<rand_type>, IF<std::is_floating_point<rand_type>::value, std::uniform_real_distribution<rand_type>, rand_type>>>::value, "unkuown type");
		this->distribution = std::move(std::uniform_real_distribution<rand_type>(min, max));
	}
	rand_type mtrand(void) {
		return this->distribution(this->engine);
	}
private:
	std::uniform_real_distribution distribution;
	std::mt19937 engine;
};
#endif //INC_MTRAND32_H
