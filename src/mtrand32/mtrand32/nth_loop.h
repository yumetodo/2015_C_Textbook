#pragma once
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