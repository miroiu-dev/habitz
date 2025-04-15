export class QueryError extends Error {
	constructor(
		public title: string,
		public description: string
	) {
		super(description);
		this.title = title;
	}
}
