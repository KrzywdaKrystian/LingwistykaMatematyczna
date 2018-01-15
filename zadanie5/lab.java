import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SyntaxScanner {
	
	static List<Character> zdanie = new ArrayList<>();
	int index = -1;
	
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Wprowadü zdanie do analizy");
		String sentence = scanner.nextLine();
		char[] charsArray = sentence.toCharArray();
		for (char c : charsArray) {
			zdanie.add(c);
		}

		SyntaxScanner syntaxScanner = new  SyntaxScanner();
		if(syntaxScanner.isSCorrect()){
			System.out.println("Zdanie "+sentence+" jest poprawne dla tej gramatyki");
		}else{
			System.out.println("Zdanie "+sentence+" nie jest poprawne dla tej gramatyki");
		}
		scanner.close();
	}
	
    public boolean isSCorrect() {
        index = -1;

        return isWCorrect()
                && checkT(';')
                && isZCorrect()
                && index == zdanie.size() - 1;
    }

    private boolean isZCorrect() {
        int backup = index;

        if (isWCorrect()) {
            return checkT(';')
                    && isZCorrect();
        } else {
            index = backup;
            return true;
        }
    }

    private boolean isWCorrect() {
        return isPCorrect()
                && isWPCorrect();
    }

    private boolean isWPCorrect() {
        int backup = index;

        if (isOCorrect()) {
            return isWCorrect();
        } else {
            index = backup;
            return true;
        }
    }

    private boolean isPCorrect() {
        int backup = index;

        if (isRCorrect()) {
            return true;
        } else {
            index = backup;
            return checkT('(')
                    && isWCorrect()
                    && checkT(')');
        }

    }

    private boolean isRCorrect() {
        return isLCorrect()
                && isRpCorrect();

    }

    private boolean isRpCorrect() {
        int backup = index;

        if (checkT('.')) {
            return isLCorrect();
        } else {
            index = backup;
            return true;
        }
    }

    private boolean isLCorrect() {
        return isissCCorrect()
                && isLpCorrect();

    }

    private boolean isLpCorrect() {
        int backup = index;

        if (isLCorrect()) {
            return true;
        } else {
            index = backup;
            return true;
        }
    }
    private boolean checkT(char ch) {
    	index++;
    	return index < zdanie.size()
    			&& zdanie.get(index) == ch;
    }

    private boolean isissCCorrect() {
        index++;
        return index < zdanie.size()
                && "0123456789".indexOf(zdanie.get(index)) != -1;
    }

    private boolean isOCorrect() {
        index++;
        return index < zdanie.size()
                && "*:+-/^".indexOf(zdanie.get(index)) != -1;
    }

	
}
