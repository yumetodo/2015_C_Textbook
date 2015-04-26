#include "strcmp.h"
#include <limits>
#include <cstddef>
int my_strcmp(const char *string1, const char *string2){
	const auto search_limits = std::numeric_limits<size_t>::max();//無限ループ防止
}
