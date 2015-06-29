#ifndef INC_MTRAND32_H
#define INC_MTRAND32_H
#if (defined(_MSC_VER) && _MSC_VER > 1000) || (defined(__clang__) && (__clang_major__ > 3 || (__clang_major__ == 3 && __clang_minor__ > 2))) ||(defined(__ICC) && __ICC > 1000) ||defined (__GNUC__) && !defined(__ICC) && !defined(__clang__) && (__GNUC__ >= 4 || (__GNUC__ == 3 && __GNUC_MINOR__ >= 4))
#pragma once
#endif
#include <random>
#include <cstdint>//uint_least32_t
#include <type_traits>
std::mt19937 create_engine();

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
using my_uniform_distribution = typename IF<
	std::is_integral<rand_type>::value, std::uniform_int_distribution<rand_type>, std::uniform_real_distribution<rand_type>
>::type;

template<typename rand_type> class mtrand32
{
public:
	mtrand32(rand_type min, rand_type max) : distribution(min, max){
		this->engine = create_engine();
		static_assert(std::is_arithmetic<rand_type>::value == true, "'rand_type' is illegal type.");//非算術型にはコンパイルエラーを
	}
	rand_type mtrand(void) {
		return this->distribution(this->engine);
	}
private:
	my_uniform_distribution<rand_type> distribution;
	std::mt19937 engine;
};
#endif //INC_MTRAND32_H
