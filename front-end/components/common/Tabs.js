import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import '../../scss/common/tabs.scss';

export default class Tabs extends Component {
    componentDidMount() {
        this.setStylesForActiveTab();
    }

    componentDidUpdate() {
        this.setStylesForActiveTab();
    }

    setStylesForActiveTab() {
        const activeTab = this.node.getElementsByClassName('active')[0];
        if (activeTab) {
            const underlineStyles = this.tabsUnderline.style;
            underlineStyles.width = `${activeTab.offsetWidth}px`;
            underlineStyles.left = `${activeTab.offsetLeft}px`;
        }
    }

    render() {
        const { tabs, className, onTabClick } = this.props;

        return (
            <nav
                ref={node => (this.node = node)}
                className={classNames({ tabs: true, [className]: true })}>
                {tabs.map((tab, index) => (
                    <Link
                        key={index}
                        to={tab.link}
                        className={classNames({
                            tab: true,
                            active: tab.active,
                            disabled: tab.disabled
                        })}
                        onClick={!tab.disabled && onTabClick && onTabClick.bind(null, index)}>
                        {tab.text}
                    </Link>
                ))}
                <hr
                    ref={node => (this.tabsUnderline = node)}
                    className="tabs-underline" />
            </nav>
        );
    }
}
