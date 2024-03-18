import { ofetch } from "ofetch";
import { format } from "date-fns";
import { ref } from "vue";
import type { RequestData } from "@repo/types";
import type { GetTaskObject } from "@repo/types";
import { urlModifier } from "../utils/urlModifier";

export const taskData = ref<GetTaskObject[]>([]);

export async function taskRequest({
  method,
  taskBody,
  id,
  searchTerm,
}: RequestData) {
  if (method === "POST") {
    await ofetch(urlModifier({}), {
      method,
      body: {
        ...taskBody,
        createdAt: format(new Date(), "dd/MM/yyyy"),
      },
    });
  }

  if (method === "PATCH") {
    await ofetch(
      urlModifier(
        {
          id,
        },
        true
      ),
      {
        method,
        body: {
          completedAt: format(new Date(), "dd/MM/yyyy"),
        },
      }
    );
  }

  if (method === "DELETE") {
    await ofetch(
      urlModifier({
        id,
      }),
      {
        method,
      }
    );
  }

  if (method === "PUT") {
    await ofetch(
      urlModifier({
        id,
      }),
      {
        method,
        body: {
          ...taskBody,
          updatedAt: format(new Date(), "dd/MM/yyyy"),
        },
      }
    );
  }

  taskData.value = (await ofetch(urlModifier({ searchTerm }))).map(
    (task: GetTaskObject) => {
      return {
        ...task,
        isEditing: false,
      };
    }
  );
}
