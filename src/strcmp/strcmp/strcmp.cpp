#include "strcmp.h"
#include <limits>
#include <cstddef>
#include <cerrno>
int my_strcmp(const char *string1, const char *string2){
	if (nullptr == string1 || nullptr == string2){
		errno = EINVAL;
		return -2;
	}
	const auto search_limits = std::numeric_limits<size_t>::max();//無限ループ防止
	size_t i;
	for (i = 0; i < search_limits && '\0' != string1[i] && '\0' != string2[i] && string1[i] == string2[i]; i++);
	if (search_limits == i){
		errno = EINVAL;
		return -2;
	}
	//MSVCの実装では1,0,-1のいずれかを返す
	return (string1[i] == string2[i]) ? 0 : (string1[i] > string2[i]) ? 1 : -1;//引き算にするとアンダーフローの危険がある
}
