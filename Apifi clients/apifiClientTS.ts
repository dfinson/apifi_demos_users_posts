let apiUrl = location.origin + '/graphql';
let apiWsUrl = apiUrl.replace('http', 'ws');
let apiSseUrl = apiUrl + '/sse';
let includeCredentials = false;
let bearerToken: string;



// project specific client side API calls

export default{

	setBearerToken(token: string): void{
		bearerToken = token;
	},

	setApiUrl(url: string): void{
		apiUrl = url;
	},

	setApiWsUrl(url: string): void{
		apiWsUrl = url;
	},

	setApiSseUrl(url: string): void{
		apiSseUrl = url;
	},

	setIncludeCredentials(value: boolean): void{
		includeCredentials = value;
	},

	async getUserById(input: User, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<User>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query getUserById($input: Long) { getUserById(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async createUser(input: User, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<User>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation createUser($input: UserInput) { createUser(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async associatePostsWithUser(owner: User, input: Array<Post>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Array<Post>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation associatePostsWithUser($owner: UserInput, $input: [PostInput]) { associatePostsWithUser(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async updatePostsOfUser(owner: User, input: Array<Post>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Array<Post>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation updatePostsOfUser($owner: UserInput, $input: [PostInput]) { updatePostsOfUser(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async removePostsFromUser(owner: User, input: Array<Post>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Array<Post>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation removePostsFromUser($owner: UserInput, $input: [PostInput]) { removePostsFromUser(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async postsOfUser(owner: User, input: PageRequest, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Page<Post>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query postsOfUser($owner: UserInput, $input: PageRequestInput) { postsOfUser(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async postsOfUserFreeTextSearch(owner: User, input: FreeTextSearchPageRequest, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Page<Post>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query postsOfUserFreeTextSearch($owner: UserInput, $input: FreeTextSearchPageRequestInput) { postsOfUserFreeTextSearch(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	onAssociatePostsWithUser(input: EntityCollectionSubscriptionRequestInput<User, Post>): SubscriptionEventsEmitter<Array<Post>>{
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onAssociatePostsWithUser($owner: User, $backPressureStrategy: OverflowStrategy) { onAssociatePostsWithUser(owner: $owner, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"owner": input.owner, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter<Array<Post>>(eventSourceUrl);
	},

	onUpdatePostsOfUser(input: EntityCollectionSubscriptionRequestInput<User, Post>): SubscriptionEventsEmitter<Array<Post>>{
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onUpdatePostsOfUser($owner: User, $backPressureStrategy: OverflowStrategy) { onUpdatePostsOfUser(owner: $owner, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"owner": input.owner, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter<Array<Post>>(eventSourceUrl);
	},

	onRemovePostsFromUser(input: EntityCollectionSubscriptionRequestInput<User, Post>): SubscriptionEventsEmitter<Array<Post>>{
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onRemovePostsFromUser($owner: User, $backPressureStrategy: OverflowStrategy) { onRemovePostsFromUser(owner: $owner, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"owner": input.owner, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter<Array<Post>>(eventSourceUrl);
	},

	async addReactionsToPost(owner: Post, input: Array<Reaction>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Array<Reaction>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation addReactionsToPost($owner: PostInput, $input: [Reaction]) { addReactionsToPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async removeReactionsFromPost(owner: Post, input: Array<Reaction>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Array<Reaction>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation removeReactionsFromPost($owner: PostInput, $input: [Reaction]) { removeReactionsFromPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async reactionsOfPost(owner: Post, input: PageRequest, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Page<Reaction>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query reactionsOfPost($owner: PostInput, $input: PageRequestInput) { reactionsOfPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async freeTextSearchReactionsOfPost(owner: Post, input: FreeTextSearchPageRequest, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Page<Reaction>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query freeTextSearchReactionsOfPost($owner: PostInput, $input: FreeTextSearchPageRequestInput) { freeTextSearchReactionsOfPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async addTagCountToPost(owner: Post, input: Map<Tag, number>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Map<Tag, number>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation addTagCountToPost($owner: PostInput, $input: [Integer]) { addTagCountToPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async removeTagCountFromPost(owner: Post, input: Array<Tag>, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Map<Tag, number>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation removeTagCountFromPost($owner: PostInput, $input: [Integer>]) { removeTagCountFromPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async tagCountOfPost(owner: Post, input: PageRequest, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Page<Tag, number>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query tagCountOfPost($owner: PostInput, $input: PageRequestInput) { tagCountOfPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async freeTextSearchTagCountOfPost(owner: Post, input: FreeTextSearchPageRequest, selectionGraph: string, customHeaders?: Dictionary<string>): Promise<ExecutionResult<Page<Tag, number>>>{
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit: RequestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query freeTextSearchTagCountOfPost($owner: PostInput, $input: FreeTextSearchPageRequestInput) { freeTextSearchTagCountOfPost(owner: $owner, input: $input)${selectionGraph} }`, 
					variables: {
						"owner": owner, 
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

}

// project specific data model

export interface User{
	phoneNumber?: string;
	isArchived?: boolean;
	name?: string;
	id?: number;
	posts?: Set<Post>;
	username?: string;
}

export interface Comment{
	replies?: Set<Comment>;
	post?: Post;
	inReplyTo?: Comment;
	id?: number;
	user?: User;
	content?: string;
}

export interface Post{
	comments?: Set<Comment>;
	tagCount?: Map<Tag, number>;
	reactions?: Array<Reaction>;
	id?: number;
	user?: User;
	content?: string;
}

export enum Reaction{
	LIKE_,
	LOVE_,
	SAD_,
	ANGRY_,
	LAUGHING_
}

export enum Tag{
	INSPIRATIONAL_,
	POLITICAL_,
	TECHNOLOGY_,
	NEWS_
}

// Apifi utils object model

// represents a subset of the overall data, corresponding to server side JPA pagination
export interface Page<T>{
   content?: Array<T>;
   totalPagesCount?: number;
   totalItemsCount?: number;
   pageNumber?: number;
   customValues?: Map<string, any>;
}

// input to specify desired pagination parameters
export interface PageRequest{
   pageNumber?: number;
   sortBy?: string;
   pageSize?: number;
   sortDirection?: SortDirection;
   fetchAll?: boolean;
}

// input to specify desired pagination parameters, as well as a string value for server side free text search
export interface FreeTextSearchPageRequest extends PageRequest{
   searchTerm: string;
}

// enum type to specify pagination sort ordering
export enum SortDirection{
   ASC = 'ASC',
   DESC = 'DESC'
}

// a wrapper around any return value from the GraphQL server
export interface ExecutionResult<T>{
   data?: T;
   errors?: Array<ExecutionResultError>;
}

// should be fairly self explanatory
export interface ExecutionResultError{
   message: string;
   path?: Array<string>;
   locations?: Array<ExecutionResultErrorLocation>;
   extensions?: Map<string, any>;
}

// should be fairly self explanatory
export interface ExecutionResultErrorLocation{
   line: number;
   column: number;
}

// for custom headers to attach to query or mutation HTTP requests
export interface Dictionary<T>{
   [Key: string]: T;
}

// for GraphQLSubscriptions only - denotes the server side backpressure strategy to be employed by reactive publisher
export enum OverflowStrategy{
   IGNORE = 'IGNORE',
   ERROR = 'ERROR',
   DROP = 'DROP',
   LATEST = 'LATEST',
   BUFFER = 'BUFFER'
}

// GraphQLSubscription: consists of the SSE event callback functions and return value selection graph
export interface BaseSubscriptionRequestInput<T>{
   selectionGraph: string;
   timeout?: number;
   backPressureStrategy?: OverflowStrategy;
}

// GraphQLSubscription: wrapper around server sent events
export interface SseEvent extends Event{
   id: string;
   name: string;
   data: string;
}

// GraphQLSubscription: consists of the SSE event callback functions, 
// as well as an array of objects which will be the tracked subjects of the subscription.
export interface SubscriptionRequestInput<T> extends BaseSubscriptionRequestInput<T>{
   toObserve: Array<T>;
}

// GraphQLSubscription: consists of the SSE event callback functions, 
export interface EntityCollectionSubscriptionRequestInput<TOwner, TCollection> extends BaseSubscriptionRequestInput<Array<TCollection>>{
   owner: TOwner;
}

export class SubscriptionEventsEmitter<T>{

    constructor(eventSourceUrl: string) {

        this.eventSource = new EventSource(eventSourceUrl, { withCredentials: includeCredentials } );

        this.eventSource.addEventListener('EXECUTION_RESULT', (event: SseEvent) => {
            this.onExecutionResultConsumer && this.onExecutionResultConsumer(JSON.parse(event.data));
        }, false);        

        this.eventSource.addEventListener('COMPLETE', (event: SseEvent) => {
            this.onCompleteConsumer && this.onCompleteConsumer();
            console.log('completed event stream - terminating connection');
            this.eventSource.close();
        }, false);        

        this.eventSource.addEventListener('FATAL_ERROR', (event: SseEvent) => {
            this.onFatalErrorConsumer && this.onFatalErrorConsumer(event.data['MESSAGE']);
            console.log(`encountered fatal error: ${event.data['MESSAGE']} - terminating connection`);
            this.eventSource.close();
        }, false);
    }

    private eventSource: EventSource;
    private onExecutionResultConsumer?: (result: ExecutionResult<T>) => void;
    private onCompleteConsumer?: () => void;
    private onFatalErrorConsumer?: (message: string) => void;

   public onExecutionResult(onExecutionResultConsumer: (result: ExecutionResult<T>) => void): SubscriptionEventsEmitter<T>{
        this.onExecutionResultConsumer = onExecutionResultConsumer;
        return this;
   }

   public onComplete(onCompleteConsumer: () => void): SubscriptionEventsEmitter<T>{
        this.onCompleteConsumer = onCompleteConsumer;
        return this;
   }

   public onFatalError(onFatalErrorConsumer: (message: string) => void): SubscriptionEventsEmitter<T>{
        this.onFatalErrorConsumer = onFatalErrorConsumer;
        return this;
   }

   public terminate(): void{
        this.eventSource.close();
   }
}