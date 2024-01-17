import React, { Component } from "react";
import styles from "./style";
import { SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native";

export default class TipsNTrick extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.containerItem}>
                        <Text style={styles.textTitle}>Total Dissolved Solid (TDS)</Text>

                        <Text style={styles.textDescription}>Total dissolved solid adalah senyawa anorganik yang ditemukan dalam air, seperti garam, logam berat, dan berbagai macam senyawa organik yang terlarut dalam air. </Text>
                        
                        <Text style={styles.textDescription}>Air dengan kadar TDS yang tinggi tidak langsung memberikan dampak bagi kesehatan, tetapi kadar timbal atau tembaga yang tinggi dapat membuat seseorang sakit.</Text>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.textTitle}>Turbidity</Text>

                        <Text style={styles.textDescription}>Kekeruhan dapat didefinisikan sebagai ukuran kejernihan suatu larutan air.Faktor utama penyebab kekeruhan adalah plankton, tanah liat, celah, bahan organik yang sangat kecil, alga, dan mikroba lainnya. Saat badan air tenang, air umumnya tetap jernih kurang dari 10 NTU.</Text>

                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.textTitle}>pH</Text>

                        <Text style={styles.textDescription}>pH (potential hydrogen) adalah derajat untuk menyatakan tingkat keasaman atau kebasaan suatu larutan. Nilai pH berkisar antara 0 sampai 14. Nilai pH kurang dari 7 tergolong asam, lebih dari 7 merupakan basa, dan pH 7 bersifat netral.</Text>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.textTitle}>Temperature</Text>

                        <Text style={styles.textDescription}>Suhu merupakan salah satu parameter penting dalam menentukan apakah air minum tersebut layak konsumsi atau tidak. Hal ini karena sumber air minum yang terpapar suhu tinggi dapat memicu pertumbuhan mikroorganisme dan membuat air minum tercemar.</Text>

                        <Text style={styles.textDescription}>Contohnya adalah beberapa jenis bakteri Coliform yang dapat tumbuh dan berkembang saat air minum berada pada suhu 37°C. Sementara itu, jumlah bakteri E. Coli dapat meningkat pada air yang bersuhu 44.2°C.</Text>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.textTitle}>Tips pengelolaan air tandon yang baik:</Text>
                        <Text style={[styles.textDescription, styles.listTips]}>1. Melakukan pembersihan tandon minimal 2 minggu sekali.</Text>
                        <Text style={[styles.textDescription, styles.listTips]}>2. Memasang alat filter air/filter osmosis</Text>
                        <Text style={[styles.textDescription, styles.listTips]}>3. Menutup tempat penampungan tandon agar terhindar dari kotoran dan sinar matahari</Text>
                    </View>

                    <View style={styles.referensiContainer}>
                        <Text style={styles.referensiTitle}>Referensi :</Text>
                        <Text style={styles.referensiDesc}>https://www.halodoc.com/artikel/wajib-tahu-ini-angka-tds-yang-layak-untuk-diminum</Text>
                        <Text style={styles.referensiDesc}>https://www.rltsolutions.in/2021/07/02/turbidity-can-affect-the-ecosystem/</Text>
                        <Text style={styles.referensiDesc}>https://pristineofficial.com/artikel/pengaruh-ph-air-bagi-kesehatan-tubuh-manusia</Text>
                        <Text style={styles.referensiDesc}>https://hellosehat.com/urologi/ph-tubuh-ideal-asidosis-alkalosis/</Text>
                        <Text style={styles.referensiDesc}>https://ners.unair.ac.id/site/lihat/read/1513/kenali-kriteria-air-minum-yang-layak-konsumsi</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}