import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import oui from 'oui';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';
import { Table } from 'reactstrap';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class DeviceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sortKey: 'devmac', sortReverse: false};
    }

    render() {
        const sortedDevices = JSON.parse(JSON.stringify(this.props.devices));
        sortedDevices.sort((a, b) => {
            let ltCmp = a[this.state.sortKey] < b[this.state.sortKey];
            return this.state.sortReverse ? !ltCmp : ltCmp;
        });

        return (
            <div className='device-list'>
                <h3>Devices</h3>
                <Table striped>
                    <thead>
                    <tr>
                        <th onClick={() => this.setSortOrder('devmac')}>MAC</th>
                        <th>Manufacturer</th>
                        <th onClick={() => this.setSortOrder('first_time')}>First Seen</th>
                        <th onClick={() => this.setSortOrder('last_time')}>Last Seen</th>
                        <th onClick={() => this.setSortOrder('strongest_signal')}>Strongest Observed Signal</th>
                        <th onClick={() => this.setSortOrder('bytes_data')}>Bytes Transmitted</th>
                    </tr>
                    </thead>
                    <tbody>
                        {sortedDevices.map(this.tableItemFromDevice.bind(this))}
                    </tbody>
                </Table>
            </div>
        );
    }

    setSortOrder(key) {
        this.setState({sortKey: key, sortReverse: !this.state.sortReverse});
    }

    tableItemFromDevice(device) {
        const manufacturer_long = oui(device.devmac);
        const manufacturer_short = manufacturer_long != null ? manufacturer_long.split('\n')[0] : "unknown";

        return (
            <tr>
                <td className="clickableMac"
                    onClick={() => this.props.onSelectMac(device.devmac)}>{device.devmac}</td>
                <td>{manufacturer_short}</td>
                <td>{timeAgo.format(new Date(device.first_time * 1000), 'twitter')}</td>
                <td>{timeAgo.format(new Date(device.last_time* 1000), 'twitter')}</td>
                <td>{device.strongest_signal + " db"}</td>
                <td>{device.bytes_data}</td>
            </tr>
        );
    }
}



export default DeviceList;