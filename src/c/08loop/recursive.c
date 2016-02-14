#include <dirent.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static void ls(const char *path, unsigned int depth)
{
	DIR *dirp;
	struct dirent *entp;

	if (path == NULL) {
		fputs("error: path is not set\n", stderr);
		exit(-1);
	}

	depth--;
	if (depth <= 0) {
		fputs("error: directory is too deep\n", stderr);
		exit(-1);
	}

	if (chdir(path)) {
		fprintf(stderr, "error: failed to change directory: %d\n", errno);
		exit(errno);
	}

	dirp = opendir(".");
	if (dirp == NULL) {
		fprintf(stderr, "error: failed to open directory: %d\n", errno);
		exit(errno);
	}

	while ((entp = readdir(dirp)) != NULL) {
		/* '.'で始まるディレクトリ名では、同じディレクトリを指す"."と、
		 * 上のディレクトリを指す".."がある。また、'.'で始まるその他のエントリも
		 * 無視するのがUnixでの慣例である。 */
		if (entp->d_name[0] == '.')
			continue;

		if (entp->d_type == DT_DIR)
			ls(entp->d_name, depth);
		else
			puts(entp->d_name);
	}
}

int main(int argc, char *argv[])
{
	ls(argv[1], 4);
	return 0;
}
