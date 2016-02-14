#include <errno.h>
#include <limits.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static long add(long i, long j)
{
	return i + j;
}

static long sub(long i, long j)
{
	return i - j;
}

static const struct {
	char code[4];
	long (* func)(long, long);
} op[] = {
	{ "add", add },
	{ "sub", sub }
};

static long safestrtohl(const char *p)
{
	long l;

	l = strtol(p, NULL, 0);
	if (errno) {
		fprintf(stderr, "error: %d\n", errno);
		exit(errno);
	}

	if (l < LONG_MIN / 2 + 1 || l > LONG_MAX / 2 - 1) {
		fprintf(stderr, "error: %s is out of range\n", p);
		exit(-1);
	}

	return l;
}

int main(int argc, char *argv[])
{
	long l, m;
	size_t n;

	if (argc != 4) {
		fprintf(stderr, "usage: %s <OPCODE> <VALUE0> <VALUE1>\n", argv[0]);
		return -1;
	}

	l = safestrtohl(argv[2]);
	m = safestrtohl(argv[3]);

	for (n = 0; n < sizeof(op) / sizeof(*op); n++) {
		if (!strcmp(op[n].code, argv[1])) {
			printf("%ld\n", op[n].func(l, m));
			return 0;
		}
	}

	fprintf(stderr, "error: invalid opcode: %s\n", argv[1]);
	return -1;
}
