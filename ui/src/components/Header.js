import {Link} from 'react-router-dom';
import React from 'react';
import {Menu,  Icon} from 'semantic-ui-react';
import Search from './Search';

export default class Header extends React.Component {

    render() {
        return(
            <div>
                <Menu inverted>
                    <Menu.Item>
                        <Link to="/">
                            <h1>Huhuu</h1>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/" onClick={this.props.onLogin}>
                            Etusivu
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/settings">Asetukset</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/" onClick={this.props.onLogout}>
                            Kirjaudu ulos
                        </Link>
                    </Menu.Item>
					<Menu.Item>
						<a target="_blank" href="https://github.com/MarkkuKovanen/huhuu">
						<Icon name="question circle"/>
						</a>
					</Menu.Item>
                    <Menu.Item position="right">
                        <Search noResultsMessage="Käyttäjiä ei löytynyt."
                                placeholder="Hae käyttäjää" />
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
