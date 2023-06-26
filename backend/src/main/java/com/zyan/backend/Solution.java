package com.zyan.backend;

import java.util.*;

/**
 * First non-repeated character
 * absbca
 */

class Solution {
    public static char nonRepeatCharacter(String s) {
        char[] arr = s.toCharArray();
        int count = 0;

        for(int i=0;i<arr.length;i++ ) {
            for (int j = 0; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    count++;
                }
            }

            if (count == 0) {
                return arr[i];
            }
        }
        return ' ';
    }

    public static void main(String[] args) {
        String s = "absbca";
        nonRepeatCharacter(s);
    }
}