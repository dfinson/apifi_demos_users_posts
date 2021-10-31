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

	async users(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query users($input: PageRequestInput) { users(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async countTotalUsers(customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query countTotalUsers { countTotalUsers }`, 
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async countTotalArchivedUsers(customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query countTotalArchivedUsers { countTotalArchivedUsers }`, 
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
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

	async getUsersByIds(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query getUsersByIds($input: [Long]) { getUsersByIds(input: $input)${selectionGraph} }`, 
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

	async createUsers(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation createUsers($input: [UserInput]) { createUsers(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async updateUser(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation updateUser($input: UserInput) { updateUser(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async updateUsers(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation updateUsers($input: [UserInput]) { updateUsers(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async deleteUser(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation deleteUser($input: UserInput) { deleteUser(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async deleteUsers(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation deleteUsers($input: [UserInput]) { deleteUsers(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async archiveUser(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation archiveUser($input: UserInput) { archiveUser(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async archiveUsers(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation archiveUsers($input: [UserInput]) { archiveUsers(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async deArchiveUser(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation deArchiveUser($input: UserInput) { deArchiveUser(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async deArchiveUsers(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `mutation deArchiveUsers($input: [UserInput]) { deArchiveUsers(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	async archivedUsers(input, selectionGraph, customHeaders){
			let requestHeaders = { "Content-Type": "application/json" }
			if(customHeaders) requestHeaders = Object.assign({}, requestHeaders, customHeaders);
			if(bearerToken) requestHeaders["Authorization"] = bearerToken;
			const requestInit = {
				method: "POST",
				credentials: !!includeCredentials ? 'include' : 'omit',
				headers: requestHeaders,
				body: JSON.stringify({
					query: `query archivedUsers($input: PageRequestInput) { archivedUsers(input: $input)${selectionGraph} }`, 
					variables: {
						"input": input
					}
				})
			};
			return await (await fetch(apiUrl, requestInit)).json();
	},

	onUsersCreated(input){
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onUsersCreated($backPressureStrategy: OverflowStrategy) { onUsersCreated(backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	onUserUpdated(input){
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onUserUpdated($toObserve: [User], $backPressureStrategy: OverflowStrategy) { onUserUpdated(toObserve: $toObserve, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"toObserve": input.toObserve, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	onUserDeleted(input){
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onUserDeleted($toObserve: [User], $backPressureStrategy: OverflowStrategy) { onUserDeleted(toObserve: $toObserve, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"toObserve": input.toObserve, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	onUserArchived(input){
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onUserArchived($toObserve: [User], $backPressureStrategy: OverflowStrategy) { onUserArchived(toObserve: $toObserve, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"toObserve": input.toObserve, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter(eventSourceUrl);
	},

	onUserDeArchived(input){
			const queryParam = encodeURIComponent(
				JSON.stringify({
					query: `subscription onUserDeArchived($toObserve: [User], $backPressureStrategy: OverflowStrategy) { onUserDeArchived(toObserve: $toObserve, backPressureStrategy: $backPressureStrategy)${input.selectionGraph} }`, 
					variables: {
						"toObserve": input.toObserve, 
						"backPressureStrategy": input.backPressureStrategy || 'BUFFER'
					}
			}));
			const timeoutParam = input.timeout ? `&timeout=${input.timeout}` : '';
			const eventSourceUrl = `${apiSseUrl}?queryString=${queryParam}${timeoutParam}`;
			return new SubscriptionEventsEmitter(eventSourceUrl);
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