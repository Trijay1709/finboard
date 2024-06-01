import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType,InferResponseType } from "hono/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useAccountDelete = (id?:string)=>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType,Error>(
        {
            mutationFn : async()=>{

                const response = await client.api.accounts[":id"]["$delete"]({
                    param: {id}
                })
                return await response.json();
            },
            onSuccess: ()=>{
                toast.success("Account Deleted")
                // queryClient.invalidateQueries({queryKey:["account",{id}]});
                queryClient.invalidateQueries({queryKey:["accounts"]});
            },
            onError:()=>{
                console.log(mutation.error)
                toast.error("Failed to Delete account")
            }
        }
        
    );
    return mutation;

}