import classes from "./Board.module.css";

export const Board = () => {
	return (
		<main className={classes["board-container"]}>
			<div className={classes["weekday-wrapper"]}>
				<ul className={classes["weekday-list"]}>
					<li key="monday">Monday</li>
					<li key="tuesday" className={classes.active}>
						Tuesday
					</li>
					<li key="wednesday">Wednesday</li>
					<li key="Thursday">Thursday</li>
					<li key="friday">Friday</li>
					<li key="saturday">Saturday</li>
					<li key="sunday">Sunday</li>
				</ul>
			</div>
			<div className={classes.board}>
				<div className={classes["time-wrapper"]}>
					<ol className={classes["time-list"]}>
						<li className={`${classes.card} ${classes.header}`}>Time</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
						<li className={`${classes.card} ${classes.item}`}>10h 30m</li>
					</ol>
				</div>
				<div className={classes["tasks-wrapper"]}>
					<div
						className={`${classes["task-line"]} ${classes["conflict"]}`}
					>
						<ul className={classes["task-list"]}>
							<li className={classes.conflict}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing
									elit Lorem ipsum dolor sit amet, consectetur
									adipiscing elit
								</p>
								<button>Delete</button>
							</li>
							<li className={classes.conflict}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing
									elit Lorem ipsum dolor sit amet, consectetur
									adipiscing elit
								</p>
								<button>Delete</button>
							</li>
							<li className={classes.conflict}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing
									elit Lorem ipsum dolor sit amet, consectetur
									adipiscing elit
								</p>
								<button>Delete</button>
							</li>
							<li className={classes.conflict}>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing
									elit Lorem ipsum dolor sit amet, consectetur
									adipiscing elit
								</p>
								<button>Delete</button>
							</li>
						</ul>
					</div>
					<div className={classes["task-line"]}>
						<ul className={classes["task-list"]}>
							<li>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing
									elit Lorem ipsum dolor sit amet, consectetur
									adipiscing elit
								</p>
								<button>Delete</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
};
