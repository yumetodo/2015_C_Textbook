#include "strlen.h"
#include <limits>
size_t my_strlen(const char *str){
	if (nullptr == str) return 0;
	const auto search_limits = std::numeric_limits<size_t>::max();//無限ループ防止
	size_t len;
	for (len = 0; search_limits > len && '\0' != str[len]; len++);
	return (search_limits == len) ? 0 : len;
}
