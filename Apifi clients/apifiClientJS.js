let apiUrl = location.origin + '/graphql';
let apiWsUrl = apiUrl.replace('http', 'ws');
let apiSseUrl = apiUrl + '/sse';
let includeCredentials = false;
let bearerToken;



// project specific client side API calls

export default{

	setBearerToken(token){
		bearerToken = token;
	},

	setApiUrl(url){
		apiUrl = url;
	},

	setApiWsUrl(url){
		apiWsUrl = url;
	},

	setApiSseUrl(url){
		apiSseUrl = url;
	},

	setIncludeCredentials(value){
		includeCredentials = value;
	},

	async getUserById(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async createUser(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async associatePostsWithUser(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async updatePostsOfUser(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async removePostsFromUser(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async postsOfUser(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async postsOfUserFreeTextSearch(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	onAssociatePostsWithUser(input){
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
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	onUpdatePostsOfUser(input){
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
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	onRemovePostsFromUser(input){
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
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	async addReactionsToPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async removeReactionsFromPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async reactionsOfPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async freeTextSearchReactionsOfPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async addTagCountToPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async removeTagCountFromPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async tagCountOfPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

	async freeTextSearchTagCountOfPost(owner, input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
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

export class SubscriptionEventsEmitter{

    constructor(eventSourceUrl) {

        this.eventSource = new EventSource(eventSourceUrl, { withCredentials: includeCredentials } );

        this.eventSource.addEventListener('EXECUTION_RESULT', (event) => {
            this.onExecutionResultConsumer && this.onExecutionResultConsumer(JSON.parse(event.data));
        }, false);        

        this.eventSource.addEventListener('COMPLETE', (event) => {
            this.onCompleteConsumer && this.onCompleteConsumer();
            console.log('completed event stream - terminating connection');
            this.eventSource.close();
        }, false);        

        this.eventSource.addEventListener('FATAL_ERROR', (event) => {
            this.onFatalErrorConsumer && this.onFatalErrorConsumer(event.data['MESSAGE']);
            console.log(`encountered fatal error: ${event.data['MESSAGE']} - terminating connection`);
            this.eventSource.close();
        }, false);
    }

    eventSource;
    onExecutionResultConsumer;
    onCompleteConsumer;
    onFatalErrorConsumer;

    onExecutionResult(onExecutionResultConsumer){
        this.onExecutionResultConsumer = onExecutionResultConsumer;
        return this;
   }

    onComplete(onCompleteConsumer){
        this.onCompleteConsumer = onCompleteConsumer;
        return this;
   }

    onFatalError(onFatalErrorConsumer){
        this.onFatalErrorConsumer = onFatalErrorConsumer;
        return this;
   }

    terminate(){
        this.eventSource.close();
   }
}