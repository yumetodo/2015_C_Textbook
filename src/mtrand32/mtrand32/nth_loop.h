#ifndef INC_NTH_LOOP_H
#define INC_NTH_LOOP_H
#if (defined(_MSC_VER) && _MSC_VER > 1000) || (defined(__clang__) && (__clang_major__ > 3 || (__clang_major__ == 3 && __clang_minor__ > 2))) ||(defined(__ICC) && __ICC > 1000) ||defined (__GNUC__) && !defined(__ICC) && !defined(__clang__) && (__GNUC__ >= 4 || (__GNUC__ == 3 && __GNUC_MINOR__ >= 4))
#pragma once
#endif
#include <cstddef>//std::size_t
class counter_iterator {
	std::size_t i;
public:
	counter_iterator() : i(0) { }
	counter_iterator(std::size_t n) : i(n) { }
	bool operator == (const counter_iterator & rhs) const { return i == rhs.i; }
	bool operator != (const counter_iterator & rhs) const { return i != rhs.i; }
	std::size_t & operator * () { return i; }
	counter_iterator & operator ++ () { ++i; return *this; }
};
class nth_loop {
private:
	std::size_t i;
public:
	nth_loop(std::size_t n) : i(n) { }
	counter_iterator begin() const { return counter_iterator(); }
	counter_iterator end() const { return counter_iterator(i); }
};
nth_loop rep(std::size_t n) { return nth_loop(n); }
nth_loop operator "" _(unsigned long long int n) {
	return nth_loop(static_cast<std::size_t>(n));
}
#endif //INC_NTH_LOOP_H