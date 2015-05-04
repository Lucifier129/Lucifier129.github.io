define(function (require, exports, mdoule) {
	var React = require('react')
	var Router = require('react-router')

	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var NotFoundRoute = Router.NotFoundRoute;


	var App = React.createClass({
		render: function() {
			return (
				<div className="tab">
					<Index className="tab-list" list={this.props.tabList} />
					<RouteHandler list={this.props.data[this.props.path]} />
				</div>
				)
		}
	})

	var Main = React.createClass({
		render: function() {
			return (
				<div className="tab-main">
					{
						this.props.list.map(function(item) {
							return <p>{item}</p>
						})
					}
				</div>
				)
		}
	})

	var Index = React.createClass({
		render: function() {
			return(
				<div className={this.props.className || ''}>
				{
					this.props.list.map(function(item) {
						return <Link to={item.path}>{item.title}</Link>
					})
				}
				</div>
				)
		}
	})

	var Tips = React.createClass({
		render: function() {
			return <Main list={['Not Found']} />
		}
	})

	var data = {
		tabList: [{
			path: '/',
			title: '首页'
		},{
			path: '/hotels',
			title: '酒店'
		},{
			path: '/vacations',
			title: '旅游'
		},{
			path: '/flights',
			title: '机票'
		}],
		data: {
			'/': ["酒店", '旅游', '机票'],
			'/hotels': ["国内酒店", "国际酒店", "团购", "特卖酒店", "途家公寓", "酒店+景点", "客栈民宿"],
			'/vacations': ["旅游首页", "周末游", "跟团游", "自由行", "邮轮", "酒店+景点", "当地玩乐", "包团定制", "游学", "签证", "企业会奖", "顶级游", "爱玩户外", "保险", "特卖汇"],
			'/flights': ["国内机票", "国际机票", "机+酒", "航班动态", "值机选座", "退票改签", "机场攻略", "机场巴士"]
		}
	}

	var routes = (
				<Route name="app" path="/" handler={App}>
					{
						data.tabList.map(function(item) {
							return (
								<Route name={item.path} handler={Main} />
								)
						})
					}
					<NotFoundRoute handler={Tips} />
				</Route>
				)

	// var FirstName = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>FirstName: {this.props.name}</div>
	// 			)
	// 	}
	// })

	// var LastName = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>LastName: {this.props.name}</div>
	// 			)
	// 	}
	// })

	// var Tips = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>Change the url to show your name.</div>
	// 			)
	// 	}
	// })

	// var App = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div style={{textAlign: 'center'}}>
	// 				<header>header</header>
	// 				<RouteHandler {...this.props.params} />
	// 			</div>
	// 			)
	// 	}
	// })

	// var Test = React.createClass({
	// 	render: function() {
	// 		return <div>test</div>
	// 	}
	// })

	// var routes = (
	// 	<Route name="app" path="/" handler={App}>
	// 		<Route path="firstname/:name" handler={FirstName} />
	// 		<Route path="lastname/:name" handler={LastName} />
	// 		<DefaultRoute handler={Tips} />
	// 		<NotFoundRoute handler={Tips} />
	// 	</Route>
	// 	)

	Router.run(routes, function(Handler, state) {
		React.render(<Handler {...state} {...data}  />, document.getElementById('container'))
	})









	// var App = React.createClass({
	//   render: function () {
	//     return (
	//       <div>
	//         <header>
	//           <ul>
	//             <li><Link to="app">Dashboard</Link></li>
	//             <li><Link to="inbox">Inbox</Link></li>
	//             <li><Link to="calendar">Calendar</Link></li>
	//           </ul>
	//           Logged in as Jane
	//         </header>

	//         {/* this is the important part */}
	//         <RouteHandler title="test" />
	//       </div>
	//     );
	//   }
	// })

	// var Inbox = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>inbox</div>
	// 			)
	// 	}
	// })

	// var Calendar = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>Calendar</div>
	// 			)
	// 	}
	// })

	// var Dashboard = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>{this.props.title}</div>
	// 			)
	// 	}
	// })

	// var NotFound = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div>NotFound</div>
	// 			)
	// 	}
	// })

	// var routes = (
	//   <Route name="app" path="/" handler={App}>
	//     <Route name="inbox" handler={Inbox} />
	//     <Route name="calendar" handler={Calendar}/>
	//     <DefaultRoute handler={Dashboard}/>
	//     <NotFoundRoute handler={NotFound}/>
	//   </Route>
	// );

	// Router.run(routes, function (Handler, status) {
	//   React.render(<Handler {...status}/>, document.getElementById('container'));
	// });

	// var Header = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<header>{this.props.header || 'header'}</header>
	// 			)
	// 	}
	// })

	// var Main = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div id="main">main</main>
	// 			)
	// 	}
	// })

	// var Sidebar = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<div id="sidebar">sidebar</div>
	// 			)
	// 	}
	// })

	// var Footer = React.createClass({
	// 	render: function() {
	// 		return (
	// 			<footer>footer</footer>
	// 			)
	// 	}
	// })



})