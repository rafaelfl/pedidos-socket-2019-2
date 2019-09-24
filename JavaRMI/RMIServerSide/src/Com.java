import java.rmi.*;
import java.rmi.server.*;
import java.util.*;
 
public class Com extends UnicastRemoteObject implements ComInterface {
 
    public Com() throws RemoteException {}

	public boolean requestMenu() throws RemoteException {
		System.out.println("The menu was sent.");
		return true;
	}

	public boolean order(String a) throws RemoteException {
		String[] pedidos = {"1","2","3","4"};

        // Convert String Array to List
        List<String> list = Arrays.asList(pedidos);

        // A or B
        if (list.contains(a)) {
            System.out.println("Your order is being prepared.");
            return true;
            
        } else{
        	System.out.println("Your entry is not on the menu.");
        	return false;
        }

        
	}

	public boolean confirmReceipt(String confirm) throws RemoteException {
		String[] s = {"y", "Y"};
		String[] n = {"n","N"};
		List<String> lists = Arrays.asList(s);
		List<String> listn = Arrays.asList(n);
		if (lists.contains(confirm)) {return true;}
		if (listn.contains(confirm)){return false;}
		else {return false;}
	}

	@Override
	public void send() throws RemoteException {
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
        System.out.println("The order is being sent.");
        
        try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
 }