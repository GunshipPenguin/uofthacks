import React from 'react';
import DeviceList from "./DeviceList";
import PacketList from "./PacketList";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    componentDidMount() {
        this.updateDeviceList();
        setInterval(this.updateDeviceList.bind(this),2000);
    }

    updateDeviceList() {
        fetch("http://localhost:8080/api/devices")
            .then(response => response.json())
            .then(data => this.setState({devices: data}))
            .then(this.updatePacketList.bind(this))
    }

    updatePacketList() {
        if (this.state.selectedMac == null) {
            this.setState({selectedMac: this.state.devices[0].devmac});
        }

        fetch(`http://localhost:8080/api/packets/${this.state.selectedMac}`)
            .then(response => response.json())
            .then(data => this.setState({packets: data}))
    }

    selectMac(mac) {
        this.setState({selectedMac: mac});
        this.updatePacketList();
    }

    render() {
        if (this.state) {
            return (
                <div className='row'>
                    <div className='col-md-6'>
                        <DeviceList devices={this.state.devices}
                                    selectedMac={this.state.selectedMac}
                                    onSelectMac={this.selectMac.bind(this)}/>
                    </div>
                    <div className='col-md-6'>
                        <PacketList packets={this.state.packets} mac={this.state.selectedMac} />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default App;