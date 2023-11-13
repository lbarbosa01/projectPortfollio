// Lemar Barbosa
// This program allows a user to create different types of bank accounts and update their contents.

import java.util.*;
import java.io.*;

class BankAccount {
    private String _accountNumber;
    private double _balance;

    public BankAccount() {
        _balance = 0;
        _accountNumber = null;
    }

    public BankAccount(String accountNumber, double balance) {
        _balance = balance;
        _accountNumber = accountNumber;
    }

    public void setAccount(String accountNumber) {
        _accountNumber = accountNumber;
    }

    public String getAccount() {
        return _accountNumber;
    }

    public void deposit(double deposit) {
        _balance += deposit;
    }

    public void setBalance(double amount) {
        _balance = amount;
    }

    public boolean withdraw(double withdraw) {
        double status = _balance - withdraw;
        if (status >= 0) {
            _balance = status;
            return true;
        } else return false;
    }

    public double getBalance() {
        return _balance;
    }

    public String toString() {
        return "Account: #" + _accountNumber
                + ", Balance: $" + Math.round(_balance);
    }

    public boolean equals(BankAccount account) {
        if (account._accountNumber.equals(_accountNumber))
            return true;
        else return false;
    }
}

class CheckingAccount extends BankAccount {
    private int _checkNumber;

    public CheckingAccount() {
        _checkNumber = 0;
    }

    public CheckingAccount(String accountNumber, double balance, int checkNumber) {
        super(accountNumber, balance);
        _checkNumber = checkNumber;
    }

    public boolean deposit(int checkNumber, double putIn) {
        if (_checkNumber <= checkNumber) {
            super.deposit(putIn);
            _checkNumber = checkNumber;
            return true;
        } else return false;
    }

    public void setLastCheck(int checkNumber) {
        _checkNumber = checkNumber;
    }

    public int getLastCheck() {
        return _checkNumber;
    }

    public String toString() {
        return super.toString() + ", Check Number: " +
                Integer.toString(_checkNumber);
    }

    public boolean equals(BankAccount account) {
        if (account instanceof CheckingAccount) {
            if (((CheckingAccount) account)._checkNumber ==
                    _checkNumber && super.equals(account))
                return true;
            else
                return false;
        } else
            return false;
    }
}

class InterestAccount extends BankAccount {
    private double _percentRate;

    public InterestAccount() {
        _percentRate = 0.05;
    }

    public InterestAccount(String accountNumber, double balance, double percentRate) {
        super(accountNumber, balance);
        _percentRate = percentRate;
    }
    public void setInterest() {
        this.setBalance(this.getBalance() + (this.getBalance() * _percentRate));
    }
    public void updateInterest(double rate) {
        this.setBalance(this.getBalance() - (this.getBalance() * _percentRate));
        _percentRate = rate;
        this.setBalance(this.getBalance() + (this.getBalance() * _percentRate));
    }

    public double getRate() {
        return _percentRate;
    }

    public String toString() {
        return super.toString() + ", Interest Rate: " + (int)(100 * _percentRate) + "%";
    }

    public boolean equals(BankAccount account) {
        if (account instanceof InterestAccount) {
            if (((InterestAccount) account)._percentRate == _percentRate && super.equals(account))
                return true;
            else
                return false;
        } else
            return false;
    }
}

class FixedDepositAccount extends InterestAccount {
    private boolean _applicable;

    public FixedDepositAccount() {
        _applicable = false;
    }

    public FixedDepositAccount(String accountNumber, double balance,
                               double percentRate, boolean applicable) {
        super(accountNumber, balance, percentRate);
        _applicable = applicable;
        if (_applicable) this.setBalance(balance + (this.getBalance() * this.getRate()));
    }
    public void setReq(boolean req) {
        if (req) {
            this.setBalance(this.getBalance() + (this.getBalance() * this.getRate()));
            _applicable = true;
        } else {
            this.setBalance(this.getBalance() - (this.getBalance() * this.getRate()));
            _applicable = false;
        }
    }

    public boolean getReq() {
        return _applicable;
    }

    public String toString() {
        return super.toString() + ", Interest Applied: " + _applicable;
    }

    public boolean equals(BankAccount account) {
        if (account instanceof FixedDepositAccount) {
            if (((FixedDepositAccount) account)._applicable == _applicable && super.equals(account))
                return true;
            else
                return false;
        } else
            return false;
    }
}

public class Main {
    public static void userInput() {
        System.out.println("[1]Add Account [2]Deposit [3]Withdraw " +
                "[4]Applied Interest [5]Print [6]Exit");
        System.out.println("Select Option Number: ");
    }

    public static void addAccount(Scanner scan, ArrayList<BankAccount> accounts) {
        System.out.println("Select Type of Bank Account:");
        System.out.println("[1]Regular [2]Checking [3]Interest [4]Fixed Deposit");
        String dummy = scan.nextLine();
        int type = scan.nextInt();
        String number = enterNumber(scan, accounts);
        System.out.println("Enter an Initial Deposit");
        double initial = scan.nextDouble();
        if (type == 1) {
            BankAccount account = new BankAccount(number, initial);
            accounts.add(account);
        } else if (type == 2) {
            CheckingAccount account = new CheckingAccount(number, initial, 0);
            accounts.add(account);
        } else if (type == 3) {
            System.out.println("Enter Percentage Rate as a Double: ");
            double rate = scan.nextDouble();
            InterestAccount account = new InterestAccount(number, initial, rate);
            account.setInterest();
            accounts.add(account);
        } else if (type == 4) {
            System.out.println("Enter Percentage Rate as a Double: ");
            double rate = scan.nextDouble();
            boolean req = false;
            boolean valid = false;
            while (!valid) {
                System.out.println("Applicable for Interest? [1]Yes [2]No ");
                int applicable = scan.nextInt();
                if (applicable == 1) {
                    req = true;
                    valid = true;
                } else if (applicable == 2) {
                    valid = true;
                } else System.out.println("Invalid Input");
            }
            FixedDepositAccount account = new FixedDepositAccount(number, initial, rate, req);
            accounts.add(account);
        } else {
            System.out.println("Input Error");
        }
    }

    public static String enterNumber(Scanner scan, ArrayList<BankAccount> accounts) {
        boolean valid = false;
        String number = "-1";
        while (!valid) {
            System.out.println("Enter an Account Number: ");
            String dummy1 = scan.nextLine();
            number = Integer.toString(scan.nextInt());
            boolean found = false;
            int i = 0;
            while (!found && i < accounts.size()) {
                if (accounts.get(i).getAccount().equals(number)) {
                    found = true;
                }
                i++;
            }
            if (found) System.out.println("Number already Used");
            else valid = true;
        }
        return number;
    }

    public static void deposit(Scanner scan, ArrayList<BankAccount> accounts) {
        System.out.println("Enter Account Number: ");
        String number = Integer.toString(scan.nextInt());
        boolean found = false;
        int i = 0;
        while (!found && i < accounts.size()) {
            if (accounts.get(i).getAccount().equals(number)) {
                System.out.println("Enter Deposit Amount: ");
                double add = scan.nextDouble();
                System.out.println("$" + add + " was deposited to Account "
                        + accounts.get(i).getAccount());
                if (accounts.get(i) instanceof CheckingAccount) {
                    System.out.println("Enter Check Number: ");
                    int checknum = scan.nextInt();
                    if (!((CheckingAccount) accounts.get(i)).deposit(checknum, add))
                        System.out.println("Check Number Error: Entered number must be " +
                                "equal to or greater than last Check Number");
                        System.out.println("Last Check Number: " + ((CheckingAccount) accounts.get(i)).getLastCheck());
                } else {
                    accounts.get(i).deposit(add);
                }
                found = true;
            }
            i++;
        }
        if (!found) System.out.println("Account Fot Found");
    }

    public static void withdraw(Scanner scan, ArrayList<BankAccount> accounts) {
        System.out.println("Enter Account Number: ");
        String number = Integer.toString(scan.nextInt());
        boolean found = false;
        int i = 0;
        while (!found && i < accounts.size()) {
            if (accounts.get(i).getAccount().equals(number)) {
                System.out.println("Enter Withdrawal Amount: ");
                double subtract = scan.nextDouble();
                if (accounts.get(i).withdraw(subtract)) {
                    System.out.println("$" + subtract + " was withdrawn from Account "
                            + accounts.get(i).getAccount());
                } else {
                    System.out.println("Not enough money in the account: No money was withdrawn");
                }
                found = true;
            }
            i++;
        }
        if (!found) System.out.println("Account Not Found");
    }
    public static void applyInterest(Scanner scan, ArrayList<BankAccount> accounts) {
        System.out.println("Enter Fixed Deposit Account Number: ");
        String number = Integer.toString(scan.nextInt());
        boolean found = false;
        int i = 0;
        while (!found && i < accounts.size()) {
            if (accounts.get(i).getAccount().equals(number) &&
                    accounts.get(i) instanceof FixedDepositAccount) {
                System.out.println("Interest Applied: " +
                        ((FixedDepositAccount) accounts.get(i)).getReq());
                System.out.println("Change Status? [1]Yes [2]No ");
                int change = scan.nextInt();
                if (change == 1) {
                    if (((FixedDepositAccount) accounts.get(i)).getReq()) {
                        ((FixedDepositAccount) accounts.get(i)).setReq(false);
                        System.out.println("Removed Interest to Account");
                    } else {
                        ((FixedDepositAccount) accounts.get(i)).setReq(true);
                        System.out.println("Applied Interest to Account");
                    }
                } else if (change == 2 ){
                    System.out.println("Status Unchanged");
                } else {
                    System.out.println("Input Error: Status Unchanged");
                }
                found = true;
            }
            i++;
        }
        if (!found) System.out.println("Account Not Found");
    }
    public static void print(Scanner scan, ArrayList<BankAccount> accounts) {
        System.out.println("[1]All [2]Checking [3]Interest [4]Fixed Deposit");
        System.out.println("Enter Print Option: ");
        int print = scan.nextInt();
        if (print == 1) {
            for (BankAccount account : accounts) {
                System.out.println(account.toString());
            }
        } else if (print == 2 ) {
            for (BankAccount account : accounts) {
                if (account instanceof CheckingAccount)
                    System.out.println(account);
            }
        } else if (print == 3) {
            for (BankAccount account : accounts) {
                if (account instanceof InterestAccount)
                    System.out.println(account);
            }
        } else if (print == 4) {
            for (BankAccount account : accounts) {
                if (account instanceof FixedDepositAccount)
                    System.out.println(account);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        Scanner scan = new Scanner(System.in);
        ArrayList<BankAccount> accounts = new ArrayList<>();
        userInput();
        int option = scan.nextInt();
        while (option != 6) {
            if (option == 1) {
                addAccount(scan, accounts);
            } else if (option == 2) {
                deposit(scan, accounts);
            } else if (option == 3) {
                withdraw(scan, accounts);
            } else if (option == 4) {
                applyInterest(scan, accounts);
            } else if (option == 5) {
                print(scan, accounts);
            }
            userInput();
            option = scan.nextInt();
        }
        System.out.println("Exited Program");
    }
}