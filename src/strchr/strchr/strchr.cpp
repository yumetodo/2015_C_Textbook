#include "strchr.h"
#ifdef __cplusplus
char * mystrchr(char * str, int character) {
	size_t i;
	for (i = 0; '\0' != str[i] && character != str[i]; ++i);
	return (character != str[i]) ? nullptr : &str[i];
}
#endif
_CONST_RETURN char * mystrchr(const char * str, int character) {
	return mystrchr(const_cast<char*>(str), character);
}
