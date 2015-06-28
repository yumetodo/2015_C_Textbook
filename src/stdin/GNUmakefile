# Makefile for NTP_timer_kai.cpp
# NTP_timer_kai.exe: NTP_timer_kai.cpp

TARGET 	= stdin.exe
SRCS 	= ./stdin/Source.c

# 基本コマンド
RM 		:= rm
CXX 	:= g++
CC 		:= gcc

# デバッグ時とリリース時の微調整
CXX_DEBUG_FLAGS		=	-g -O0 -Wall
CXX_RELEASE_FLAGS	=	-O2

# 基本オプション
# 基本オプション
ifeq ($(CC),gcc)
CPPFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -std=c99
else
CPPFLAGS = -std=c99
endif

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
		$(CC) $^ -o $@ $(CXXFLAGS) $(CPPFLAGS)

# make clean
.PHONY: clean
clean:
	$(RM) -f *.exe