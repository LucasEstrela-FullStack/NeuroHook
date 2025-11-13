import { Loader2, Wand2 } from "lucide-react";
import { webhookListSchema } from "../http/schemas/webhooks";
import { WebHooksListItem } from "./webhooks-list-item";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export function WebHooksList(){
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const [ checkedWebhooksIds, setCheckedWebhooksIds ] = useState<string[]>([]);
  const [ generateHandlerCode, setGenerateHandlerCode] = useState<string | null>(null);

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

  function handleCheckedWebhook(checkedWebhooksId: string){
    if(checkedWebhooksIds.includes(checkedWebhooksId)) {
      setCheckedWebhooksIds(state => {
        return state.filter(webhookId => webhookId !== checkedWebhooksId)
      })
    } else {
      setCheckedWebhooksIds(state => [...state,checkedWebhooksId])
    }
  }

  async function handleGenerateHandler(){
    const response = await fetch("http://localhost:3333/api/generate", {
      method: "POST",
      body: JSON.stringify({ webhookIds: checkedWebhooksIds }),
      headers: {
        "Content-Type": "aplication/json"
      }
    })

    type GenerateResponse = { code: string}

    const data: GenerateResponse = await response.json();

    setGenerateHandlerCode(data.code)
  }

  const hasAnyWebhookChecked = checkedWebhooksIds.length > 0;

  return(
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
         <button
            disabled={!hasAnyWebhookChecked}
            className="bg-indigo-400 mb-3 text-white w-full rounded-lg flex items-center justify-center gap-3 font-medium text-sm py-2 disabled:opacity-50"
            onClick={() => handleGenerateHandler()}
          >
            <Wand2 className="size-4" />
            Gerar handler
          </button>

        {webhooks.map(webhook => {
          return (
             <WebHooksListItem 
             key={webhook.id} 
             webhook={webhook} 
             onWebhookChecked={handleCheckedWebhook}
            isWebhookChecked={checkedWebhooksIds.includes(webhook.id)}
             />
          )
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