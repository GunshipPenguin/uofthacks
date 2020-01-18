import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import en from 'javascript-time-ago/locale/en';
import TimeAgo from 'javascript-time-ago';
import { Table } from 'reactstrap';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class PacketList extends React.Component {
    render() {
        if (this.props.packets == null) {
            return null;
        }

        const sortedPackets = JSON.parse(JSON.stringify(this.props.packets));
        sortedPackets.sort((a, b) => a.ts_sec < b.ts_sec);

        return  (
            <div className='packet-list'>
                <h3>Packets Seen from {this.props.mac}</h3>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Transmitted</th>
                        <th>Source MAC</th>
                        <th>Dest. MAC</th>
                        <th>Location</th>
                    </tr>
                    </thead>
                    <tbody>
                        {sortedPackets.map(tableItemFromPacket)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

function tableItemFromPacket(packet) {
    return (
        <tr>
            <td>{timeAgo.format(new Date(packet.ts_sec * 1000), 'twitter')}</td>
            <td>{packet.sourcemac}</td>
            <td>{packet.destmac}</td>
            <td>Unknown</td>
        </tr>
    );
}


export default PacketList;