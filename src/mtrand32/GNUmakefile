# Makefile for prime_number_generator.exe

TARGET:= mtrand32.exe
SRCS  := ./mtrand32/mtrand32.cpp ./mtrand32/ia_rdrand.cpp ./mtrand32/main.cpp

# 基本コマンド
RM 		:= rm
CXX 	:= g++
CC 		:= gcc

ADDITIONALPOTIONS :=
# デバッグ時とリリース時の微調整
CXX_DEBUG_FLAGS		=	-g -O0 -Wall
CXX_RELEASE_FLAGS	=	-O2

# 基本オプション
ifeq ($(CXX),gcc)
CPPFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -std=c++14
else
CPPFLAGS = -std=c++14
endif

LBITS := $(shell getconf LONG_BIT)
ifeq ($(LBITS),64)
   CPPFLAGS+= -mrdrnd
else
   CPPFLAGS+= -mrdrnd -m32
endif

# make
# debug
.PHONY: Debug
Debug: CXXFLAGS+=$(CXX_DEBUG_FLAGS)
Debug: all
# release
.PHONY: Release
Release: CXXFLAGS+=$(CXX_RELEASE_FLAGS)
Release: all

all: $(TARGET)
$(TARGET): $(SRCS)
	$(CXX) $^ -o $@ $(CXXFLAGS) $(CPPFLAGS) $(ADDITIONALPOTIONS)

# make clean
.PHONY: clean
clean:
	$(RM) -f *.exe