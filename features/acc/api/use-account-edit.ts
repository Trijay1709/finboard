import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType,InferResponseType } from "hono/client";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;

export const useAccountEdit = (id?:string)=>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType,Error,RequestType>(
        {
            mutationFn : async(json)=>{

                const response = await client.api.accounts[":id"]["$patch"]({json,param:{id}})
                return await response.json();
            },
            onSuccess: ()=>{
                toast.success("Account Edited")
                queryClient.invalidateQueries({queryKey:["account",{id}]});
                queryClient.invalidateQueries({queryKey:["accounts"]});
            },
            onError:()=>{
                console.log(mutation.error)
                toast.error("Failed to Edit account")
            }
        }
        
    );
    return mutation;

}