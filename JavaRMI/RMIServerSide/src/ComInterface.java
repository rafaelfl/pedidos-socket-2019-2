import java.rmi.Remote;
import java.rmi.RemoteException;
 

public interface ComInterface extends Remote {
	
	public boolean requestMenu() throws RemoteException;
	public boolean order(String p) throws RemoteException;
	public void send() throws RemoteException;
	public boolean confirmReceipt(String c)	throws RemoteException;
	
}