# Makefile for mtrand32.cpp
# mtrand32.exe: mtrand32.cpp
# 	g++ ./mtrand32/mtrand32.cpp --input-charset=utf-8 -fexec-charset=CP932 -std=c++11 -O2 -Wall -o mtrand32.exe -lws2_32 -lwinmm -lwsock32

PROG := myapp.exe
SRCS := main.c foo.c
OBJS := $(SRCS:%.c=%.o)
DEPS := $(SRCS:%.c=%.d)

# 基本コマンド
RM 		:= rm
CXX 	:= g++
CC 		:= gcc

# デバッグ時とリリース時の微調整
CXX_DEBUG_FLAGS		=	-g -O0 -Wall
CXX_RELEASE_FLAGS	=	-O2

ifeq ($(CXX),g++)
CPPFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -std=c++14
else
CPPFLAGS = -std=c++14
endif

ifeq ($(CXX),gcc)
CFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -std=c11
else
CFLAGS = -std=c11
endif

all: $(PROG)

-include $(DEPS)

$(PROG): $(OBJS)
        $(CC) -o $@ $^

%.o: %.c
        $(CC) -c -MMD -MP $<

clean:
        rm -f $(PROG) $(OBJS) $(DEPS)




# 基本オプション
CPPFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -Wall -std=c++11

# make
# debug
.PHONY	: Debug
Debug 	: CXXFLAGS+=$(CXX_DEBUG_FLAGS)
Debug 	: all
# release
.PHONY	: Release
Release	: CXXFLAGS+=$(CXX_RELEASE_FLAGS)
Release	: all

all : $(TARGET)
$(TARGET) : $(SRCS)
		$(CXX) $^ -o $@ $(CXXFLAGS) $(CPPFLAGS)

# make clean
.PHONY: clean
clean:
	rm -f *.o