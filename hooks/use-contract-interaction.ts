import { useState, useCallback } from 'react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { Contract } from 'ethers';
import { toast } from 'sonner';

interface UseContractInteractionProps {
  address: string;
  abi: any;
  functionName: string;
}

export function useContractRead({ address, abi, functionName }: UseContractInteractionProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const publicClient = usePublicClient();

  const read = useCallback(
    async (...args: any[]) => {
      if (!publicClient) {
        setError('Public client not available');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await publicClient.readContract({
          address: address as `0x${string}`,
          abi,
          functionName,
          args,
        });

        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        toast.error(`Read failed: ${errorMessage}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [publicClient, address, abi, functionName]
  );

  return { data, isLoading, error, read };
}

export function useContractWrite({ address, abi, functionName }: UseContractInteractionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const { data: walletClient } = useWalletClient();

  const write = useCallback(
    async (...args: any[]) => {
      if (!walletClient) {
        setError('Wallet not connected');
        toast.error('Please connect your wallet');
        return;
      }

      setIsLoading(true);
      setError(null);
      setHash(null);

      try {
        const contract = new Contract(address, abi, walletClient);
        const tx = await contract[functionName](...args);
        
        setHash(tx.hash);
        toast.loading('Transaction pending...');
        
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
          toast.success('Transaction confirmed');
          return receipt;
        } else {
          throw new Error('Transaction failed');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        toast.error(`Transaction failed: ${errorMessage}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [walletClient, address, abi, functionName]
  );

  return { isLoading, error, hash, write };
}

export function useContractData() {
  const [contractData, setContractData] = useState<{
    yieldVault?: any;
    riskGuard?: any;
    token?: any;
    strategies?: any[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    // This will be populated with actual contract calls
    // For now, it serves as a placeholder
    setIsLoading(false);
  }, []);

  return { contractData, isLoading, fetchAllData };
}
