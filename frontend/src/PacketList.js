import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeAgo from './TimeAgo';
import { Table } from 'reactstrap';

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

const nodename_to_location = {
    "node1_wlan0": "SF Pit (upper)",
    "node0_wlan0": "SF Pit (lower)"
};

function tableItemFromPacket(packet) {
    return (
        <tr>
            <td>{TimeAgo(packet.ts_sec)}</td>
            <td>{packet.destmac}</td>
            <td>{nodename_to_location[packet.nodename]}</td>
        </tr>
    );
}


export default PacketList;