#include "strstr.h"
#include <limits>
#include <cstddef>
const char *my_strstr(const char *str, const char *strSearch){
	if (nullptr == str || nullptr == strSearch) return nullptr;
	size_t i, j;
	const auto search_limits = std::numeric_limits<size_t>::max();//無限ループ防止
	for (i = 0, j= 0; search_limits != i && '\0' != str[i] && '\0' != strSearch[j]; i++){//正規のbreak条件は'\0' == strSearch[j]
		for (
			j = 0; 
			search_limits - 1 != i && search_limits != j && '\0' != str[i] && '\0' != strSearch[j] && str[i] == strSearch[j];
			i++, j++
		);
	}
	return ('\0' != strSearch[j]) ? nullptr : &str[i - j - 1];//この時必ずi > jとなる。さもなくばreturnはnullptr
}