# Makefile for book_list_storage.cpp
# book_list_storage.exe: book_list_storage.cpp
# 	g++ ./NTP_timer/book_list_storage.cpp --input-charset=utf-8 -fexec-charset=CP932 -std=c++11 -O2 -Wall -o book_list_storage.exe -lws2_32 -lwinmm -lwsock32

TARGET 	= book_list_storage.exe
SRCS 	= ./book_list_storage/Source.cpp

# 基本コマンド
RM 		:= rm
CXX 	:= g++
CC 		:= g++

# デバッグ時とリリース時の微調整
CXX_DEBUG_FLAGS		=	-g -O0
CXX_RELEASE_FLAGS	=	-O2

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