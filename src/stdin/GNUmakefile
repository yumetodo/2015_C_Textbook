# Makefile for NTP_timer_kai.cpp
# NTP_timer_kai.exe: NTP_timer_kai.cpp

TARGET 	= stdin.exe
SRCS 	= ./stdin/Source.c

# ��{�R�}���h
RM 		:= rm
CXX 	:= g++
CC 		:= gcc

# �f�o�b�O���ƃ����[�X���̔�����
CXX_DEBUG_FLAGS		=	-g -O0
CXX_RELEASE_FLAGS	=	-O2

# ��{�I�v�V����
CPPFLAGS = --input-charset=utf-8 -fexec-charset=CP932 -Wall -std=c99

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
	rm -f *.o