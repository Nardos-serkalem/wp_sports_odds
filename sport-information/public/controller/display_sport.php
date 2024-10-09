<?php

class Sport_Information_Display
{
    public function get_sport_data()
    {
        $url = "https://odds.p.rapidapi.com/v4/sports/upcoming/odds?regions=us&oddsFormat=decimal&markets=h2h%2Cspreads&dateFor";
        $args = array(
            'headers' => array(
                'x-rapidapi-host' => 'odds.p.rapidapi.com',
                'x-rapidapi-key' => '948e603ddfmsha19eb8adf737a3ep19d871jsn500d39ddd51b'
            )
        );
        $response = wp_remote_get($url, $args);
        if (is_wp_error($response)) {
            return "Request failed: " . $response->get_error_message();
        }
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        return $data; 
    }

    public function display_sport_info()
    {
        ob_start();
        $sport_data = $this->get_sport_data();
        if (is_array($sport_data)) {
            echo '<h2>Upcoming Sports Odds</h2>';

            foreach ($sport_data as $event) {
                echo '<div class="event">';

                if (isset($event['sport_title']) && isset($event['home_team']) && isset($event['away_team'])) {
                    echo '<h3>Sport: ' . esc_html($event['sport_title']) . '</h3>';
                    echo '<p>Home Team: ' . esc_html($event['home_team']) . '</p>';
                    echo '<p>Away Team: ' . esc_html($event['away_team']) . '</p>';
                    echo '<p>Commence Time: ' . esc_html($event['commence_time']) . '</p>';

                    if (isset($event['bookmakers']) && is_array($event['bookmakers'])) {
                        echo '<p>Odds:</p>';
                        echo '<ul>';
                        foreach ($event['bookmakers'] as $bookmaker) {
                            echo '<li>' . esc_html($bookmaker['title']) . ': ';
                            echo '</li>';
                        }
                        echo '</ul>';
                    } else {
                        echo '<p>No odds data available.</p>';
                    }
                } else {
                    echo '<p>No event data available.</p>';
                }

                echo '</div>';
            }
        } else {
            echo '<p>' . esc_html($sport_data) . '</p>';
        }
        return ob_get_clean();
    }
}
$sport_info_display = new Sport_Information_Display();
echo $sport_info_display->display_sport_info();
?>