export interface Conversation {
  // the unique identifier for the conversation.
  id: number
  // the subject of the conversation.
  subject: number
  // The current state of the conversation (read, unread or archived).
  workflow_state: string,
  // A <=100 character preview from the most recent message.
  last_message: string,
  // the date and time at which the last message was sent.
  start_at: string,
  // the number of messages in the conversation.
  message_count: number
  // whether the current user is subscribed to the conversation.
  subscribed: boolean,
  // whether the conversation is private.
  private: boolean,
  // whether the conversation is starred.
  starred: boolean,
  // Additional conversation flags (last_author, attachments, media_objects). Each
  // listed property means the flag is set to true (i.e. the current user is the
  // most recent author, there are attachments, or there are media objects)
  properties: any,
  // Array of user ids who are involved in the conversation, ordered by
  // participation level, then alphabetical. Excludes current user, unless this is
  // a monologue.
  audience: any[],
  // Most relevant shared contexts (courses and groups) between current user and
  // other participants. If there is only one participant, it will also include
  // that user's enrollment(s)/ membership type(s) in each course/group.
  audience_contexts: any,
  // URL to appropriate icon for this conversation (custom, individual or group
  // avatar, depending on audience).
  avatar_url: string
  // Array of users participating in the conversation. Includes current user.
  participants: any,
  // indicates whether the conversation is visible under the current scope and
  // filter. This attribute is always true in the index API response, and is
  // primarily useful in create/update responses so that you can know if the
  // record should be displayed in the UI. The default scope is assumed, unless a
  // scope or filter is passed to the create/update API call.
  visible: boolean,
  // Name of the course or group in which the conversation is occurring.
  context_name: string
}