#include "mtrand32.h"
#include "nth_loop.h"
#include <iostream>
int main() {
	mtrand32<double> rnd(0.0, 1.0);
	for (auto i : 20_) {
		std::cout << rnd.mtrand();
		if ((i + 1) % 5)
			std::cout << " ";
		else
			std::cout << std::endl;
	}
	return 0;
}