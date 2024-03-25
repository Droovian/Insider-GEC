import { z } from 'zod'

export const PostVoteValidator = z.object({
  postId:z.union([z.number(), z.undefined()]),
  voteType: z.enum(['UP', 'DOWN']),
})

export type PostVoteRequest = z.infer<typeof PostVoteValidator>


