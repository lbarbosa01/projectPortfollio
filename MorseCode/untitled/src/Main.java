// Lemar Barbosa
// This program allows a user to translate morse code into alphabetic characters and vice versa.

import java.util.*;
import java.io.*;

class MorseLetter {
    private char _character;
    private String _sign;

    public MorseLetter() {
        _character = 0;
        _sign = "";
    }

    public MorseLetter(char character, String sign) {
        _character = character;
        _sign = sign;
    }

    public void setChar(char character) {
        _character = character;
    }

    public void setSign(String sign) {
        _sign = sign;
    }

    public char getChar() {
        return _character;
    }

    public String getSign() {
        return _sign;
    }
}

class MorseCode {
    private MorseLetter[] _letters;
    private int _position;

    public MorseCode() {
        _letters = new MorseLetter[26];
        _position = 0;
    }

    public MorseCode(int size) {
        _letters = new MorseLetter[size];
        _position = 0;
    }

    public void addLetter(char character, String symbol) {
        MorseLetter t = new MorseLetter(character, symbol);
        _letters[_position] = t;
        _position ++;
    }

    public void removeLetter() {
        MorseLetter t = new MorseLetter();
        _letters[_position -1] = t;
        _position --;
    }

    public boolean modifyLetter(char character, String symbol) {
        if (findChar(character) < 0)
            return false;
        else {
            System.out.println(findChar(character));
            _letters[findChar(character)].setSign(symbol);
            return true;
        }
    }

    public boolean modifyLetter(String symbol, char character) {
        if (findSign(symbol) < 0)
            return false;
        else _letters[findSign(symbol)].setChar(character);
        return true;
    }

    public int codeSize() {
        return _position;
    }
    
    public MorseLetter get(int idx) {
        return _letters[idx];
    }

    private int findChar(char character) {
        int ctr = 0;
        boolean found = false;
        while (ctr<_letters.length && !found) {
            if (character == _letters[ctr].getChar()) {
                found = true;
            }
            else ctr++;
        }
        if (found) return ctr;
        else return -1;
    }

    private int findSign(String symbol) {
        int ctr = 0;
        boolean found = false;
        while (ctr<_letters.length && !found) {
            if (symbol.equals(_letters[ctr].getSign())) {
                found = true;
            }
            else ctr++;
        }
        if (found) return ctr;
        else return -1;
    }
}

public class Main {
    public static void promptMenu() {
        System.out.println();
        System.out.println("[1]Convert Alphabet to Morse [2]Convert Morse to Alphabet [3]Print History [4]Exit Program");
        System.out.print("Enter Option Number: ");
    }
    public static void MorseToChar(Scanner scan, MorseCode morse, ArrayList<String> charList,
                                   ArrayList<String> morseList) {
        System.out.println("Enter Morse Code (space delimited for each letter): ");
        String dummy = scan.nextLine();
        String input = scan.nextLine();
        morseList.add(input);
        String[] code = input.split(" ");
        String attach = "";
        for (int i = 0; i < code.length; i++) {
            for (int j = 0; j < morse.codeSize(); j++) {
                if (code[i].equals(morse.get(j).getSign())) {
                    System.out.print(morse.get(j).getChar());
                    attach += morse.get(j).getChar();
                }
            }
        }
        charList.add(attach);
    }
    public static void CharToMorse(Scanner scan, MorseCode morse, ArrayList<String> charList,
                                   ArrayList<String> morseList) {
        System.out.println("Enter Alphabetic Characters (all letters must be capitalized and no spaces): ");
        boolean valid = false;
        String dummy = scan.nextLine();
        String attach = "";
        while (!valid) {
            String lowerCase = "";
            String input = scan.nextLine();
            charList.add(input);
            for (int i = 0; i < input.length(); i++) {
                if (Character.isLowerCase(input.charAt(i))) {
                    lowerCase += input.charAt(i);
                }
            }
            if (lowerCase.equals("")) {
                for (int i = 0; i < input.length(); i++) {
                    for (int j = 0; j < morse.codeSize(); j++) {
                        if (input.charAt(i) == morse.get(j).getChar()) {
                            System.out.print(morse.get(j).getSign() + " ");
                            attach += morse.get(j).getSign() + " ";
                        }
                    }
                }
                morseList.add(attach);
                valid = true;
            } else {
                System.out.println("Must Capitalize Letters and Have No Spaces");
                System.out.println("Enter again: ");
            }
        }
    }
    public static void print(ArrayList<String> charList, ArrayList<String> morseList) {
        if (charList.size() == 0) {
            System.out.println("No History");
        } else {
            for (int i = 0; i < charList.size(); i++) {
                System.out.println((i+1) + ") " +charList.get(i) + " = " + morseList.get(i));
            }
        }
    }
    public static void main(String[] args) throws IOException {
        Scanner scan = new Scanner(System.in);
        Scanner infile = new Scanner(new File("morse.txt"));

        // Reading in MorseCode File
        MorseCode morse = new MorseCode();
        char alphabet;
        String symbol;
        while (infile.hasNext()) {
            alphabet = infile.next().charAt(0);
            symbol = infile.next();
            morse.addLetter(alphabet, symbol);
        }

        ArrayList<String> morseList = new ArrayList<String>();
        ArrayList<String> charList = new ArrayList<String>();

        promptMenu();
        int option = scan.nextInt();
        while (option != 4) {
            if (option == 1) {
                CharToMorse(scan, morse, charList, morseList);
            } else if (option == 2) {
                MorseToChar(scan, morse, charList, morseList);
            } else if (option == 3) {
                print(charList, morseList);
            }
            else {
                System.out.println("Invalid Input");
            }
            promptMenu();
            option = scan.nextInt();
        }
        System.out.println("Exited Program");
    }
}