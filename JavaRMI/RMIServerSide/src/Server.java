import java.rmi.*;
import java.rmi.server.*;   
 
public class Server {
	   public static void main (String[] argv) {
		   try {
			   Com Hello = new Com();			   		   
			   Naming.rebind("rmi://localhost/1098", Hello);
 
			   System.out.println("Server is ready.");
			   }catch (Exception e) {
				   System.out.println("Server failed: " + e);
				}
		   }
}