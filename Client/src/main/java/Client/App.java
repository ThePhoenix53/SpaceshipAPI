/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package Client;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class App {
    public String getGreeting() {
        return "Hello world.";
    }

    public static void main(String[] args) throws IOException, ParseException {
        URL url = new URL("http://localhost:3000/spaceship");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);

        int status = con.getResponseCode();
        System.out.println(status);


        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        con.disconnect();


        JSONParser jsonParser = new JSONParser();
        JSONObject object = (JSONObject) jsonParser.parse(content.toString());

        int count = (int)((long) object.get("count"));
        JSONArray array = (JSONArray) object.get("spaceship");

        String id = "";

        for (int i = 0; i < array.size(); i++) {
            JSONObject spaceship = (JSONObject) jsonParser.parse(array.get(i).toString());
            System.out.println(spaceship.get("name"));
            id = (String) spaceship.get("_id");
            System.out.println(id);
            System.out.println();
        }



        System.out.println(count);

//        JSONObject jsonString = new JSONObject();
//        jsonString.put("name","dog");

//        OutputStream os = httpCon.getOutputStream();
//        OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
//        osw.write("Just Some Text");
//        System.out.println(httpCon.getResponseCode());
//        System.out.println(httpCon.getResponseMessage());
//        osw.flush();
//        osw.close();

        getSpaceshipDetails(id);
    }



    public static void getSpaceshipDetails(String spaceShip) throws IOException, ParseException {
        System.out.println("\n\nSPACESHIP CALL\n");
        URL url = new URL("http://localhost:3000/spaceship/" + spaceShip);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);

        int status = con.getResponseCode();
        System.out.println(status);

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();
        con.disconnect();

        JSONParser jsonParser = new JSONParser();
        JSONObject object = (JSONObject) jsonParser.parse(content.toString());
        System.out.println(object.get("name"));
    }
}
