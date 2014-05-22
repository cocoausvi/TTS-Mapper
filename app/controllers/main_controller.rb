class MainController < ApplicationController
	def index
	end

	def map
	end

	def sendtext
		text = params[:text];
		name = params[:name];

		msg = name + ' | ' + text

		account_sid = "AC846b2c8147cf098f48dc1137d510da1f"
		auth_token = "48b868a8551c9ee0c63a1bde6c0064d6"
		client = Twilio::REST::Client.new account_sid, auth_token

		from = "+19087414234" # Your Twilio number

		friends = {
			"+17326489552" => "Corey",
		}

		friends.each do |key, value|
			client.account.messages.create(
				:from => from,
				:to => key,
				:body => msg
			)

			puts "Sent message to #{value}"
		end

		head :ok
	end
end
