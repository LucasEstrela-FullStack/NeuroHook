import { Loader2 } from "lucide-react";
import { webhookListSchema } from "../http/schemas/webhooks";
import { WebHooksListItem } from "./webhooks-list-item";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function WebHooksList(){
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["webhooks"],

    queryFn: async ({ pageParam}) => {
      const url = new URL("http://localhost:3333/api/webhooks")

      if(pageParam){
        url.searchParams.set("cursor", pageParam)
      }

      const response = await fetch(url)
      const data = await response.json();

      return webhookListSchema.parse(data);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined
    },
    initialPageParam: undefined as string | undefined,
  })

  const webhooks = data.pages.flatMap(page => page.webhooks) // Converte as páginas em um único array

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect() // Desconecta o observer anterior, se existir
    }

    observerRef.current = new IntersectionObserver(entries => {
      const entry = entries[0];

      if(entry.isIntersecting && hasNextPage && !isFetchingNextPage){
        fetchNextPage() // Carrega a próxima página quando o elemento estiver visível 
      }
    }, {
      threshold: 1.0 // Garante que o callback seja chamado quando o elemento estiver totalmente visível
    })

    if(loadMoreRef.current){
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if(observerRef.current){
        observerRef.current.disconnect() // Limpa o observer quando o componente for desmontado
      }
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage])

  return(
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {webhooks.map(webhook => {
          return <WebHooksListItem key={webhook.id} webhook={webhook}/>
        })}
      </div>

      {hasNextPage && (
        <div className="p-2" ref={loadMoreRef}>
           {isFetchingNextPage && (
            <div className="flex items-center justify-center py-2">
               <Loader2 className="size-5 animate-spin text-zinc-500" />
            </div>
           )}
        </div>
      )}
    </div>
  );
}