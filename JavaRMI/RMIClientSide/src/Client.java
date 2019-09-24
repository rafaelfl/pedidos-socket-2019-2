import java.rmi.Naming;
import java.util.Scanner;
 
public class Client {
	public static void main (String[] args) {
		ComInterface hello;
		try {
			hello = (ComInterface)Naming.lookup("rmi://localhost/1098");
			
		    boolean status = hello.requestMenu();
		    System.out.println("###### Menu ######");
			System.out.println("	1. a ");
			System.out.println("	2. b ");
			System.out.println("	3. c ");
			System.out.println("	4. d ");
			
		    while (status) {
		    	System.out.println("Insira seu pedido: ");
			    Scanner scanner = new Scanner(System.in);
			    String pedido = scanner.nextLine();
			    status = hello.order(pedido);
			    
			    if (status) {
			    	hello.send();
			    	System.out.println("Your order is being sent.");
			    	System.out.println("Did you get the order? ((y/n)");
			    	String confirm = scanner.nextLine();
			    	
			    	boolean statusConf = hello.confirmReceipt(confirm);
			    	if (statusConf == true) {
			    		System.out.println("Thank you for your preference!");
			    	} else {
			    		System.out.println("Would you like to report?");
			    	}
			    	
			    }
			    status = false;
			    
		    }
		}catch (Exception e) {
				System.out.println("HelloClient exception: " + e);
				}
		}
}