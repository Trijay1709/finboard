import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType,InferResponseType } from "hono/client";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.accounts.$post>;

export const useAccountCreate = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType,Error,RequestType>(
        {
            mutationFn : async(json)=>{
                console.log("hello")
                const response = await client.api.accounts.$post({json})
                return await response.json();
            },
            onSuccess: ()=>{
                toast.success("Account Created")
                queryClient.invalidateQueries({queryKey:["accounts"]});
            },
            onError:()=>{
                console.log(mutation.error)
                toast.error("Failed to create account")
            }
        }
        
    );
    return mutation;

}