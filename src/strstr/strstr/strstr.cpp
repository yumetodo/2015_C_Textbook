#include "strstr.h"
#include <limits>
char *my_strstr(char *str, const char *strSearch){
	if (nullptr == str || nullptr == strSearch) return nullptr;
	if ('\0' == strSearch[0]) return str;
	size_t i, j;
	bool str_is_not_terminate;
	const auto search_limits = std::numeric_limits<size_t>::max();//無限ループ防止
	for (
		str_is_not_terminate = true, i = 0, j= 0;
		search_limits != i && str_is_not_terminate && '\0' != str[i] && '\0' != strSearch[j];//正規のbreak条件は'\0' == strSearch[j]
		i++
	){
		for (
			j = 0; 
			search_limits - 1 != i && search_limits != j && (str_is_not_terminate = ('\0' != str[i])) && '\0' != strSearch[j] && str[i] == strSearch[j];
			i++, j++
		);
	}
	return ('\0' != strSearch[j]) ? nullptr : &str[i - j - 1];//この時必ずi > jとなる。さもなくばreturnはnullptr
}
_CONST_RETURN char *my_strstr(const char *str, const char *strSearch) {
	return my_strstr(const_cast<char*>(str), strSearch);
}
